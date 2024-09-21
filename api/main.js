
// localhost:8000/people/   damit ruft man 
// Format für den JSON-Body bei POST drücken, damit geklammert wird 
// get für leia-organa:
// 

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
    ctx.response.body = person.id +" -Melde, dass mir diese 2 Variablen vorliegen ;-) ;-)  "+ person.slug  // dieser Wert könnte als Balkenfütterer interpretiert werden
    fetchWebpage(iconicity.de);
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



// Function to fetch and display a webpage
async function fetchWebpage(url) {
  try {
    // Fetch the webpage using Deno's native fetch API
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    // Get the webpage content as text
    const htmlContent = await response.text();

    // Output the fetched content to the console
    console.log(htmlContent);
  } catch (error) {
    // Handle any errors that occur
    console.error(`Error: ${error.message}`);
  }
}

// Fetch and display the webpage
const url = 'https://example.com';  // Replace this with the URL you want to fetch
//fetchWebpage(url);
