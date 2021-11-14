import React from 'react'; 
import ReactDOM from 'react-dom';
import InputBox from './../InputBox';
import {render, screen, fireEvent} from '@testing-library/react';

test('test inputbox props', () => {
  render(<InputBox placeholder="Test" />)
  const el = screen.getByPlaceholderText("Test")
  expect(el).toBeInTheDocument()
  fireEvent.change(el, {target: {value: '23'}})
  expect(el.value).toBe('23')
})