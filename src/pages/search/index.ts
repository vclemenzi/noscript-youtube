export const get: APIRoute = async ({ params, request, redirect }) => {
  return redirect(`/search/${request.url.split("/")[3].split("?q=")[1]}`, 307);
}
