# FinanceWatch API
> Stock Ticker Symbol Lookup

## How to run?

```shell
  npm run start
```

## Routes

| Prefix Verb/header      | Roles                    | URI Pattern                      | Params
| :-----------------------| :------------------------| :--------------------------------|:--------------------
| GET                     | PUBLIC                   | /v1/stock                        | symbol *required

#### Error response
* http://localhost:3000/v1/
```json
{
  "data": {
    "err": "Not found"
  }
}
```

* http://localhost:3000/v1/stock
```json
{
  "data": {
    "err": "Query param symbol is required"
  }
}
```

* http://localhost:3000/v1/stock?symbol=test
```json
{
  "data": {
    "err": "Unknown symbol"
  }
}
```

#### Success response
* http://localhost:3000/v1/stock?symbol=AAPL
```json
{
  "data": {
    "latestStockPrice": 301.135,
    "companyLogo": "https://storage.googleapis.com/iexcloud-hl37opg/api/logos/AAPL.png",
    "latestCompanyNews": [
      {
      "datetime": 1578502897000,
      "headline": "Apple's story is shifting thanks to the massive success of AirPods",
      "source": "CNBC",
      "url": "https://cloud.iexapis.com/v1/news/article/d984ef1f-5b51-4994-b1ec-919b149450eb",
      "summary": "Apple's wearables category is expected to grow significantly thanks to the success of new models of AirPods and the Apple Watch.",
      "related": "AAPL",
      "image": "https://cloud.iexapis.com/v1/news/image/d984ef1f-5b51-4994-b1ec-919b149450eb",
      "lang": "en",
      "hasPaywall": false
      },
      ...
    ]
  }
}

## Curl example

```shell
  curl "http://localhost:3000/v1/stock?symbol=AAPL"
```