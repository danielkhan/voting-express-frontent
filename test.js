exports.handler = async event => {
  console.log('Raw event', JSON.stringify(event, null, 2));
 
  try {
    const metrics = await Promise.all(
      return event.Records.map(({ body }) => {
        const { searchId, latitude, longitude } = JSON.parse(body);
        return velibService.availabilities(searchId, latitude, longitude);
      }).catch(e) {
        throw e;
      }
    );
    console.log('metrics promised', JSON.stringify(metrics, null, 2));
    await velibService.sendMetrics(metrics);
    return 'OK';
  } catch (e) {
    console.log('Velib failed', JSON.stringify(e, null, 2));
    throw e;
  }
 };