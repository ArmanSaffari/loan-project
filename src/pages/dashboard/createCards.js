const  createCards = (userSummary) => {
  const memDate = new Date(userSummary.membershipDate)
  const currentDate = new Date();
  const memMonths = 
    (currentDate.getFullYear() - memDate.getFullYear()) * 12 +
    (currentDate.getMonth() - memDate.getMonth());

  const cards = [
    {
      imgSrc: "",
      title: "Months of being a member:",
      content: memMonths,
      path:"/membership" 
    },
    {
      imgSrc: "",
      title: "Monthly Membership Fee:",
      content: `$ ${userSummary.memFeeToBePaid.lastMemFee}`,
      path:"/payments" 
    },
    {
      imgSrc: "",
      title: "Total paid membership so far:",
      content: `$ ${userSummary.memFee.sum.toFixed(2)}`,
      path:"/payments" 
    },
    {
      imgSrc: "",
      title: "Number of active Loans:",
      content: `${userSummary.numberOfLoans.active.normal +
        userSummary.numberOfLoans.active.urgent}`,
      path:"/payments" 
    },
    {
      imgSrc: "",
      title: "Due membership fee payment:",
      content: `$ ${userSummary.memFeeRemained.toFixed(2)}`,
      path:"/payments" 
    },
    {
      imgSrc: "",
      title: "Due installments to be paid:",
      content: `$ ${userSummary.installmentRemained.toFixed(2)}`,
      path:"/payments" 
    },
    {
      imgSrc: "",
      title: "Monthly installments:",
      content: `$ ${userSummary.installments.reduce(
        (accumulate, value) => parseFloat(accumulate) + parseFloat(value.installmentAmount),
        0).toFixed(2)}`,
      path:"/payments" 
    }
  ];

  return cards
}

export default createCards;