import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  const response = await fetch('https://deckofcardsapi.com/api/deck/new//shuffle/?deck_count=1');
    const data = await response.json();
    console.log(data);

    // Store the deck ID
    const deckId = data.deck_id;
    console.log('New deck ID:', deckId);
 
    const drawResponse = await page.goto(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`);
    const drawData = await drawResponse.json();
    const drawnCards = drawData.cards;
    console.log('Drawn cards:', drawnCards);


    const drawResponse1 = await page.goto(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=3`);
    const drawData1 = await drawResponse1.json();
    const drawnCards1 = drawData1.cards;
    console.log('Drawn cards:', drawnCards1);


     await page.goto(`https://deckofcardsapi.com/api/deck/${deckId}/pile/pile1/add/?cards=${drawnCards1[0].code},${drawnCards1[1].code},${drawnCards1[2].code}`);
     console.log(`Added cards ${drawnCards1[0].code}, ${drawnCards1[1].code} and ${drawnCards1[2].code} to pile1`);

    // Verify the cards in each pile
    const pile1Response = await page.goto(`https://deckofcardsapi.com/api/deck/${deckId}/pile/pile1/list/`);
    const pile1Data = await pile1Response.json();
    const pile1Cards = pile1Data.piles.pile1.cards;
    console.log('Pile1 cards:', pile1Cards);

     await page.goto(`https://deckofcardsapi.com/api/deck/${deckId}/pile/pile2/add/?cards=${drawnCards1[0].code},${drawnCards1[1].code},${drawnCards1[2].code}`);
     console.log(`Added card ${drawnCards1[0].code}, ${drawnCards1[1].code} and ${drawnCards1[2].code} to pile2`);

     
 
     const pile2Response = await page.goto(`https://deckofcardsapi.com/api/deck/${deckId}/pile/pile2/list/`);
     const pile2Data = await pile2Response.json();
     const pile2Cards = pile2Data.piles.pile2.cards;
     console.log('Pile2 cards:', pile2Cards);



     const Pile1Match = JSON.stringify(pile1Cards) === JSON.stringify(drawnCards1);
    const Pile2Match = JSON.stringify(pile2Cards) === JSON.stringify(drawnCards1);

    console.log(`pile1 cards is matching with drawncards1:`, Pile1Match);
    console.log(`pile2 cards is matching with drawncards1:`, Pile2Match);

  });
   
   
   
    //await page.goto(' https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=6');
   //const responseText1 = await page.textContent('body');
   //console.log(responseText1);



  //await page.goto('https://www.deckofcardsapi.com/api/deck/new');
  //const responseText = await page.textContent('body');
  //console.log(responseText);

  

 