"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

export default function Home() {
  const [bg, setBg] = useState<"red" | "green">("red");
  const [buttonText, setButtonText] = useState("Start");
  const [timer1, setTimer1] = useState(new Date());
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null);

  async function resetState() {
    setButtonText("Start");
    setBg("red");
    setShowScore(false);
    setScore(0);
    if (timerId) clearTimeout(timerId);
  }

  const randomTimer = Math.floor(Math.floor(Math.random() * 4) + 3);

  function startOrReset() {
    if (bg === "red" || buttonText === "Re-Start") {
      setButtonText("Stay Alert ...");
      setBg("red");
      setShowScore(false);
      const timer = setTimeout(() => {
        setBg("green");
        setTimer1(new Date());
        setButtonText("Reset");
      }, randomTimer * 1000);
      setTimerId(timer);
    } else {
      resetState();
    }
  }

  function calculateReflex() {
    if (showScore) {
      resetState();
      return;
    }
    if (buttonText === "Start") {
      toast("Game is not yet started!");
      resetState();
      return;
    }
    if (bg === "red" && buttonText === "Stay Alert ...") {
      toast("Wait for the color to turn green!");
      resetState();
      return;
    }

    const timeNow = new Date();
    let timeTaken;
    if (timer1) timeTaken = timeNow.getTime() - timer1.getTime();
    console.log("Time taken:", timeTaken);
    // setBg("red");
    setButtonText("Re-Start");
    if (timeTaken) {
      setScore(timeTaken);
      setShowScore(true);
    }
  }

  return (
    <div className="">
      {/* Navbar */}
      <Navbar />

      {/* Color Div */}
      <div
        onClick={calculateReflex}
        className={`h-80 ${
          bg === "red" ? "bg-red-400" : "bg-green-400"
        } flex flex-col items-center justify-center`}
      >
        <h1 className="text-center scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl text-red-50">
          Click anywhere when the color turns green
        </h1>
        <h2 className="text-center text-green-50 scroll-m-20 mt-2 pb-2 text-xl md:text-3xl font-semibold tracking-tight first:mt-0">
          {`${showScore ? `Your reflex:${score}ms` : ""}`}
        </h2>
      </div>

      {/* Reset/Start Button */}
      <div className="mt-5 flex justify-center" onClick={startOrReset}>
        <Button variant={"outline"}>{buttonText}</Button>
      </div>
    </div>
  );
}
