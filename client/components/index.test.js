import React from 'react'

import { checkMatchRows, checkMatchColumns } from './utilities/Checkfunctions'

// import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom'
// import Fetch from './fetch'

test('checkMatchRows acts correctly', async () => {
  // ARRANGE
//  render(<Fetch url="/greeting" />)

  // ACT
  var match = {color: 1, x:1, y:1};
  var grid = [
    [1,2,3],
    [1,1,1],
    [1,2,3]
  ];
  expect(checkMatchRows(grid, match)).toEqual(expect.arrayContaining([[1,1],[2,1],[0,1]]));
 

  var match = {color: 1, x:2, y:0};
  var grid = [
    [1,1,1],
    [1,2,1],
    [1,2,3]
  ];
  expect(checkMatchRows(grid, match)).toEqual(expect.arrayContaining([[2,0],[1,0],[0,0]]));


  
  var match = {color: 1, x:1, y:0};
  var grid = [
    [1,1,2,1,3,1],
    [1,4,5,5,2,1],
    [1,2,3,1,4,5],
    [1,2,3,1,4,5],
    [1,2,3,1,4,5]
  ];
  expect(checkMatchRows(grid, match)).toEqual(expect.not.arrayContaining([[3,0],[5,0]]));
  expect(checkMatchRows(grid, match)).toEqual(expect.arrayContaining([[0,0],[1,0]]));
 
 
})


test('checkMatchColumns acts correctly', async () => {
  // ARRANGE
//  render(<Fetch url="/greeting" />)

  // ACT
  var match = {color: 1, x:0, y:1};
  var grid = [
    [1,2,3],
    [1,1,1],
    [1,2,3]
  ];
  expect(checkMatchColumns(grid, match)).toEqual(expect.arrayContaining([[0,1],[0,2],[0,0]]));
 

  var match = {color: 1, x:2, y:1};
  var grid = [
    [1,1,1],
    [1,2,1],
    [3,2,1]
  ];
  expect(checkMatchColumns(grid, match)).toEqual(expect.arrayContaining([[2,1],[2,2],[2,0]]));


  
  var grid = [
    [1,1,2,1,3,1],
    [1,4,5,5,2,1],
    [1,2,3,1,4,5],
    [1,2,3,1,4,5],
    [1,2,3,1,4,5]
  ];
  var match = {color: 1, x:5, y:0};
  expect(checkMatchColumns(grid, match)).toEqual(expect.arrayContaining([[5,0],[5,1]]));
 // expect(checkMatchColumns(grid, match)).toEqual(expect.arrayContaining([[0,0],[1,0]]));
 
 
})