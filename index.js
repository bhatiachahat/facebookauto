const puppeteer = require('puppeteer');
let cFile=process.argv[2];
let pUrl=process.argv[3];
let num=process.argv[4];
let fs=require("fs");

(async () => {
    try{

    
    let data = await fs.promises.readFile(cFile);
    let { username,password} = JSON.parse(data)[0];
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 5, 
    defaultViewport: null,
    args: ["--start-maximized", "--disable-notifications"]
  });
  let tabs = await browser.pages();
  let tab = tabs[0];
  //const page = await browser.newPage();
  await tab.setDefaultNavigationTimeout(0); 
  await tab.goto('https://facebook.com', { waitUntil: "networkidle2" });
  await tab.waitForSelector("input[type=email]");
    await tab.type("input[type=email]", username, { delay: 90 });
    await tab.type("input[type=password]", password, { delay: 90 });
  //await page.goto('https://facebook.com');
  //await page.screenshot({path: 'example.png'});
  await Promise.all([
    tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
    tab.click('.login_form_login_button '), // Clicking the link will indirectly cause a navigation
  ]);
 
   

 for(let i=0;i<2;i++){
   
 

  await tab.waitForSelector("input[data-testid=search_input]");
 
  if(i==0){
    await tab.type("input[data-testid=search_input]", " The Tribune", { delay: 90 });
 
   }
   else if(i==1){
    await tab.type("input[data-testid=search_input]", " Hindustan Times", { delay: 90 });
 
   }
  await Promise.all([
    
    tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
    tab.click('._42ft._4jy0._4w98._4jy3._517h._51sy._4w97 '), // Clicking the link will indirectly cause a navigation
  ]);
 
  await tab.waitForSelector("._3-8_.img.sp_GVXmG9vQvIC_1_5x.sx_de8866");
  await tab.waitForSelector("._6v-_ ._6v_0._4ik4._4ik5");
  let e= await tab.$("._6v-_ ._6v_0._4ik4._4ik5 a");
  let href = await tab.evaluate(function (elem) {
    return elem.getAttribute("href");
  }, e);
  console.log(href);
 // let newTab = await browser.newPage();



    await tab.goto(href ,{ waitUntil: "networkidle2" });
    //  popup => save changes may not have been saved 
    // await newTab.waitForSelector(".tag");
    // await Promise.all([
    //   newTab.click("li[data-tab=moderators]"),
    //   newTab.waitForNavigation({ waitUntil: "networkidle0" })
    // ])
    // await newTab.waitForSelector("input[id=moderator]", { visible: true });
    // await newTab.type("#moderator", "theamanthakur");
    // await newTab.keyboard.press("Enter")
    // await newTab.click(".save-challenge.btn.btn-green");
    
  



  // await Promise.all([
  //   tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
  //   tab.click('._6v-_ ._6v_0._4ik4._4ik5'), // Clicking the link will indirectly cause a navigation
  // ]);
//   let e= await tab.$("._77we ._6v_0._4ik4._4ik5");
//   let href = await tab.evaluate(function (elem) {
//     return elem.getAttribute("href");
//   }, e);
  //const preloadHref = await tab.evaluate('._6v-_ ._6v_0._4ik4._4ik5', el => el.getAttribute("href"));
  //console.log(href);

  //await tab.goto(href, { waitUntil: "networkidle2" });
  
  
//   await tab.type("input[data-testid=search_input]", "The Hindu", { delay: 120 });
//   await Promise.all([
//     tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
//     tab.click('._42ft._4jy0._4w98._4jy3._517h._51sy._4w97 '), // Clicking the link will indirectly cause a navigation
//   ]);
//   await tab.waitForSelector("._6v_0._4ik4._4ik5");
//   const preloadHref1 = await tab.$eval('._6v_0._4ik4._4ik5', el => el.href);

//   await tab.goto(preloadHref1, { waitUntil: "networkidle2" });
//   await tab.goto(pUrl, { waitUntil: "networkidle2" });
  await tab.waitForSelector("div[data-key=tab_posts]");
  await Promise.all([
    tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
    tab.click('div[data-key=tab_posts]'), // Clicking the link will indirectly cause a navigation
  ]);
  await tab.waitForNavigation({waitUntil:"networkidle2"});
  let idx=0;
  do{
    await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
    let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8") 
    let post = elements[idx];
    await tab.waitForSelector("._666k ._8c74");
      let like = await post.$("._666k ._8c74");
      await like.click({delay:190});
      console.log(idx);
      if(idx==7 || (idx-1)%7===0){
        let loader=await tab.$('.uiMorePagerLoader');
        let chain=await tab.$("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
        await tab.evaluate(function(el){
          console.log("executing");
          el.scrollIntoView({behavior: "smooth"});
        },chain);
        console.log("here");

        await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
      }
      await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
      idx++;
     
      //scrollintoview
  }while(idx<=num)
 // await tab.close();
  await tab.waitForSelector("._4kny._2s24 ._3qcu._cy7");
  await Promise.all([
    tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
    tab.click('._4kny._2s24 ._3qcu._cy7'), // Clicking the link will indirectly cause a navigation
  ]);

  
  // await tab.waitForSelector("input[data-testid=search_input]");
  // await tab.type("input[data-testid=search_input]", "Hindustan Times");
  // await Promise.all([
  //   tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
  //   tab.click('._42ft._4jy0._4w98._4jy3._517h._51sy._4w97 '), // Clicking the link will indirectly cause a navigation
  // ]);
  
  // await tab.waitForSelector("div._6v_0._4ik4._4ik5");
  // await Promise.all([
  //   tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
  //   tab.click('._6v-_ ._6v_0._4ik4._4ik5'), // Clicking the link will indirectly cause a navigation
  // ]);

 
  // await tab.waitForSelector("div[data-key=tab_posts]");
  // await Promise.all([
  //   tab.waitForNavigation({ waitUntil: "networkidle2" }), // The promise resolves after navigation has finished
  //   tab.click('div[data-key=tab_posts]'), // Clicking the link will indirectly cause a navigation
  // ]);
  // await tab.waitForNavigation({waitUntil:"networkidle2"});
  //  let idx1=0;
  // do{
  //   await tab.waitForSelector("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
  //   let elements = await tab.$$("#pagelet_timeline_main_column ._1xnd > ._4-u2._4-u8") 
  //   let post = elements[idx1];
  //   await tab.waitForSelector("._666k ._8c74");
  //     let like = await post.$("._666k ._8c74");
  //     await like.click({delay:150});
  //     console.log(idx1);
  //     if(idx1==7 || (idx1-1)%7===0){
  //       let loader=await tab.$('.uiMorePagerLoader');
  //       let chain=await tab.$("#pagelet_timeline_main_column ._1xnd .clearfix.uiMorePager");
  //       await tab.evaluate(function(el){
  //         console.log("executing");
  //         el.scrollIntoView({behavior: "smooth"});
  //       },chain);
  //       console.log("here");

  //       await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
  //     }
  //     await tab.waitForSelector(".uiMorePagerLoader", { hidden: true })
  //     idx1++;
     
  //     //scrollintoview
  // }while(idx1<=num)
}
}
catch(err){
    console.log(err);
}

  //await browser.close();
})();