'use strict'

const axios = require('axios')
const unzipper = require('unzipper')
const { products } = require('./src/products')
const fse = require('fs-extra')
const readline = require('readline');
const path = require('path')
const os = require('os')

/**
 * Txt Header:
 * ncols         1681
 * nrows         1361
 * xllcorner     112
 * yllcorner     -44
 * cellsize      0.025
 */

const url = 'http://www.bom.gov.au/web01/ncc/www/climatology/climate-classification'

async function getClimateclass(params, cb) {
  const product = products[params.type]
  const lat = params.lat
  const lon = params.lon

  if (product == null) {
    if (cb) cb(new Error('Invalid Type'), null)
    return Promise.reject('Invalid type')
  }

  const res = await axios.get(
    url + product.file,
    {
      responseType: 'arraybuffer',
      maxContentLength: 100000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
      }
    }
  )
  const directory = await unzipper.Open.buffer(res.data)
  const file = directory.files.find((file) => !file.path.includes('readme'));

  const dataDir = fse.mkdtempSync(path.join(os.tmpdir(), 'bom-climateclass-'))
  let gridFile = path.join(dataDir, file.path)
  await writeFileToTmpDir(file, gridFile);

  const rl = readline.createInterface({
    input: fse.createReadStream(gridFile),
    crlfDelay: Infinity
  });

  const header = {
    ncols: null, nrows: null,
    xllcorner: null, yllcorner: null,
    cellsize: null,
    NODATA_value: null
  }

  let itRow = 0, target = null
  for await (const line of rl) {
    const cols = line.match(/\S+/g)

    if (cols.length === 2) {
      header[cols[0]] = cols[1]
    }

    if (header.NODATA_value) {
      if (target == null) {
        target = makeTarget(lat, lon, header)
        if (target === null) rl.close()
      }

      if (itRow++ === target.r) {
        target.result = cols[target.c]
      } else continue
    }
  }

  fse.rmdirSync(dataDir, { recursive: true })
  const ret = {
    code: target.result,
    descript: product.gridCode[target.result]
  }
  if (cb) cb(null, ret)
  return ret
}

function makeTarget(lat, lon, txtHeader) {
  if (lat < Number(txtHeader.yllcorner) || lon < Number(txtHeader.xllcorner)) {
    console.log('lat/lon not valid')
    return null
  }

  const targetRow = txtHeader.nrows - 1 - Math.abs((txtHeader.yllcorner - lat) / txtHeader.cellsize)
  const targetCol = (lon - txtHeader.xllcorner) / txtHeader.cellsize

  if (targetRow > txtHeader.nrows || targetCol > txtHeader.ncols) {
    return null
  }

  return {
    r: Math.round(targetRow),
    c: Math.round(targetCol),
    result: txtHeader.NODATA_value
  }
}

async function writeFileToTmpDir(file, gridFile) {
  return new Promise((resolve) => {
    const writeStream = fse.createWriteStream(gridFile)
    file.stream().pipe(writeStream)
    writeStream.on('finish', resolve);
  })
}

exports.getClimateclass = getClimateclass