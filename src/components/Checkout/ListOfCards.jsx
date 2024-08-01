const ListOfCards = () => {
  const listOfCards = [];
  let position = 0;
  for (let i = 0; i <= 7; i++) {
    const item = (
      <li
        className="w-10 h-6"
        style={{
          backgroundImage:
            "url(https://m.media-amazon.com/images/G/31/payments-portal/r1/issuer-images/sprite-map._CB443317321_.png)",
          backgroundPosition: `${(position += -45)}px`,
        }}
      ></li>
    );
    listOfCards.push(item);
  }

  return <ul className="flex items-center gap-1 flex-wrap ">{listOfCards}</ul>;
};

export default ListOfCards;
