const ws = new WebSocket('ws://www.oakrest.deno.dev:8080');

ws.onmessage = (event) => {
  const person = JSON.parse(event.data);
  const li = document.createElement('li');
  li.textContent = `New person added: ${person.name} from ${person.homeWorld} 🦕`;
  document.getElementById('people-list').appendChild(li);
};

ws.onopen = () => {
  console.log('WebSocket connection established');
};

ws.onclose = () => {
  console.log('WebSocket connection closed');
};
