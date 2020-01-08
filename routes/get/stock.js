const IEXCloudAPI = require('../../services/IEXCloudAPI');

const stockRoute = async ({ query }, res) => {
  const { symbol } = query;
  if (!symbol) {
    res({ err: 'Query param symbol is required' }, 400);
    return;
  }
  const iexCloudApi = new IEXCloudAPI('stock');

  try {
    const quoteResponse = await iexCloudApi.quote(symbol);
    const logoResponse = await iexCloudApi.logo(symbol);
    const newsResponse = await iexCloudApi.news(symbol);

    const { latestPrice } = quoteResponse.data;
    const { url } = logoResponse.data;
    const latestCompanyNews = newsResponse.data;

    res({
      latestStockPrice: latestPrice,
      companyLogo: url,
      latestCompanyNews,
    });
  } catch (err) {
    res({ err: err.message }, err.code);
  }
};

module.exports = stockRoute;
