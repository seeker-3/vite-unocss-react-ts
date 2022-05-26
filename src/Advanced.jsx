//@ts-check
"https://codesandbox.io/s/8tzm6?file=/src/examples/Advanced.js:0-3729";

import React, { useState, useMemo, useRef } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import { testItems } from "./test-items";

export function RiExternalLinkLine(props) {
  return (
    <svg width=".75em" height=".75em" viewBox="0 0 24 24" {...props}>
      <path
        fill="#fff"
        d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6zm11-3v8h-2V6.413l-7.793 7.794l-1.414-1.414L17.585 5H13V3h8z"
      ></path>
    </svg>
  );
}

function Advanced() {
  const [currentIndex, setCurrentIndex] = useState(testItems.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(testItems.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < testItems.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < testItems.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <h1>Disintigrator CardStack</h1>
      <div >
        {testItems.map(({ title, url, summary }, index) => (
          <TinderCard
            ref={childRefs[index]}
            
            key={title}
            onSwipe={(dir) => swiped(dir, title, index)}
            onCardLeftScreen={() => outOfFrame(title, index)}
          >
            <div style={{display: index !== currentIndex ? 'none':'block'}} className={`relative border flex flex-col gap-8 `}>
      <h2 className="whitespace-pre-wrap">{title}</h2>
      <p className="whitespace-pre-wrap">{summary}</p>
      <a
        className="flex items-start gap-1"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open
        <span className="pt-1">
          <RiExternalLinkLine />
        </span>
      </a>
    </div>
          </TinderCard>
        ))}
      </div>
      <div >
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("left")}
        >
          Swipe left!
        </button>
        <button
          style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
          onClick={() => swipe("right")}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} >
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 >
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
    </div>
  );
}

export default Advanced;
