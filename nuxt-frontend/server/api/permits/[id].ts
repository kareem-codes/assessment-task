export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const id = getRouterParam(event, 'id');
  const method = event.method;

  if (method === 'GET') {
    const data = await $fetch(`${config.backendUrl}/permits/${id}`);
    return data;
  }

  if (method === 'PATCH') {
    const body = await readBody(event);
    const data = await $fetch(`${config.backendUrl}/permits/${id}`, {
      method: 'PATCH',
      body,
    });
    return data;
  }

  if (method === 'DELETE') {
    const data = await $fetch(`${config.backendUrl}/permits/${id}`, {
      method: 'DELETE',
    });
    return data;
  }
});
