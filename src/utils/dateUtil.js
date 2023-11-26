//Util Function to Determine If Two Dates Are A Day Difference
const dayDifference = (date1, date2) => {
   //Number of Milliseconds in One Day
   const oneDay = 24 * 60 * 60 * 1000;
   const differenceIsMs = date2.getTime() - date1.getTime();
   console.log(`One Day: ${oneDay}, Difference: ${differenceIsMs}`);
   return differenceIsMs >= oneDay;
};

export default dayDifference;
