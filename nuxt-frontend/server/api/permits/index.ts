export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const method = event.method;
  const query = getQuery(event);

  if (method === 'GET') {
    const queryString = new URLSearchParams(query as Record<string, string>).toString();
    const url = `${config.backendUrl}/permits${queryString ? `?${queryString}` : ''}`;
    
    const data = await $fetch(url);
    return data;
  }

  if (method === 'POST') {
    const body = await readBody(event);
    const data = await $fetch(`${config.backendUrl}/permits`, {
      method: 'POST',
      body,
    });
    return data;
  }
});
