const { getClimateclass } = require('./index')

describe('getClimateclass', function () {
  this.timeout(5000)

  it('Climate zone - rainfallmajor', function (done) {
    const params = {
      type: 'rainfall',
      lat: -42.373875,
      lon: 146.231807
    }
    getClimateclass(params, function (err, data) {
      console.log(data)
      done(err)
    })
  })

  it('Climate zone - rainfallmajor', function (done) {
    const params = {
      type: 'koppenmajor',
      lat: -42.373875,
      lon: 146.231807
    }
    getClimateclass(params, function (err, data) {
      done(err)
    })
  })
})