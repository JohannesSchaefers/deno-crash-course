import { Application, Router, send } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { WebSocketServer } from "https://deno.land/x/websocket@v0.1.1/mod.ts";

const app = new Application();
const router = new Router();
const wss = new WebSocketServer(8080); // WebSocket server on port 8080

const people = [
  { id: 1, slug: 'luke-skywalker', name: 'Luke Skywalker', ahomeWorld: 'Tatooine' },
  { id: 2, slug: 'leia-organa', name: 'Leia Organa', ahomeWorld: 'Alderaan' },
  { id: 3, slug: 'han-solo', name: 'Han Solo', ahomeWorld: 'Corellia' },
  { id: 4, slug: 'darth-vader', name: 'Darth Vader', ahomeWorld: 'Tatooine' }
];

router
  .get('/', async (ctx) => {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  })
  .get('/people', (ctx) => {
    ctx.response.body = people;
  })
  .get('/people/:slug', (ctx) => {
    const { slug } = ctx.params;
    const person = people.find((person) => person.slug === slug);
    if (person) {
      ctx.response.body = person;
    } else {
      ctx.response.body = 'That person was not found 😭';
    }
  })
  .post('/people', async (ctx) => {
    const { id, slug, name, homeWorld } = await ctx.request.body('json').value;
    const person = { id, slug, name, homeWorld };
    if (person) {
      people.push(person);
      ctx.response.body = `New person added: ${person.name} from ${person.homeWorld} 🦕`;
      // Notify all WebSocket clients about the new person
      wss.clients.forEach(client => client.send(JSON.stringify(person)));
    } else {
      ctx.response.body = "Person not added 😭";
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log('App is running on http://www.mydomain.de:8000');
});

await app.listen({ port: 8000 });
