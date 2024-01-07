
// programmed by ChatGPT

//import { h, FunctionalComponent } from 'preact';
//import { useEffect } from 'preact/hooks';

// Importing Preact
import { h, render, FunctionalComponent } from 'https://esm.sh/preact@10.19.3';

import { useEffect } from 'https://esm.sh/preact@10.19.3/hooks';


interface CounterProps {
  count: { value: number };
}

const Counter1: FunctionalComponent<CounterProps> = (props: CounterProps) => {
  // Assuming there's a variable named `valueToUpdate` that you want to watch for changes
  let valueToUpdate = 8;

  useEffect(() => {
    // Update props.count.value when the variable valueToUpdate changes
    props.count.value = valueToUpdate;
  }, [valueToUpdate]);

  return (
    <h1>props.count.value</h1>
  );
};

export default Counter1;



