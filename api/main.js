/*



// localhost:8000/people/   damit ruft man 
// Format für den JSON-Body bei POST drücken, damit geklammert wird 
// get für leia-organa:
// 


function something () { return `Vogel`;}


import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";



const app = new Application();

const router = new Router();

const people = [
  {
    id: 1,
    slug: 'luke-skywalker',
    name: 'Luke Skywalker',
    homeWorld: 'Tatooine',
  },
  {
    id: 2,
    slug: 'leia-organa',
    name: 'Leia Organa',
    homeWorld: 'Alderaan',
  },
  {
    id: 3,
    slug: 'han-solo',
    name: 'Han Solo',
    homeWorld: 'Corellia',
  },
  {
    id: 4,
    slug: 'darth-vader',
    name: 'Darth Vader',
    homeWorld: 'Tatooine',
  }
]

router
.get('/', (ctx) => {
  ctx.response.body = 'Hello from our RESTtAPI! 🦕'
})
.get('/people', (ctx) => {
  ctx.response.body = people;
})

// https://oakrest.deno.dev/people/han-solo so wird eine bestimmte Person gesucht

.get('/people/:slug', (ctx) => {
  const {slug} = ctx.params;
  const person = people.find(( person) => person.slug === slug);
  if(person) {
    ctx.response.body = person;
  } else {
    ctx.response.body = 'That person was not found 😭'
  }
})

.post('/people', async (ctx) => {
  ctx.response.body = 'Hel???+-((+))-+??+lo from our POSTAtA API! 🦕'
  const { id, slug, name, homeWorld } = await ctx.request.body('json').value
  const person = {
    id,
    slug,
    name,
    homeWorld
  }
  
  if( person) {
    people.push( person)
    ctx.response.body = person.id +" -Melde, dass mir diese 2 Variablen vorliegen ;-) ;-)  "+ person.slug + something() // dieser Wert könnte als Balkenfütterer interpretiert werden
    
    
  } else {

    ctx.response.body = "Person not added 😭"
  }  
})

app.use( router.routes());
app.use( router.allowedMethods());

app.addEventListener('listen', () => {
  console.log('App is running on http://localhost:8000');
})

app.use();

await app.listen({port: 8000})


*/


import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { ensureFile, readJson, writeJson } from "https://deno.land/std/fs/mod.ts";

const app = new Application();
const router = new Router();
const filePath = './data.json';

// Ensure the data file exists
await ensureFile(filePath);

// Read existing data from the file
let people = [];
try {
  people = await readJson(filePath);
} catch (error) {
  console.error('Error reading data file:', error);
}

router
  .get('/', (ctx) => {
    ctx.response.body = 'Hello from our REST API! 🦕';
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
    const { id, slug, name, homeWorld } = await ctx.request.body({ type: 'json' }).value;
    const person = { id, slug, name, homeWorld };
    if (person) {
      people.push(person);
      await writeJson(filePath, people, { spaces: 2 });
      ctx.response.body = person;
    } else {
      ctx.response.body = "Person not added 😭";
    }
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log('App is running on http://localhost:8000');
});

await app.listen({ port: 8000 });


