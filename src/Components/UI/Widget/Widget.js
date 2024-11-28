import React, { useEffect, useState } from "react";

const WidgetComponent = () => {
  const [userInput, setUserInput] = useState({
    mouse: false,
    touch: false,
    keyboard: false,
  });

  const navigationKeys = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Escape",
    "Enter",
    "Tab",
  ];

  useEffect(() => {
    const mouseMoves = new Array(10).fill(0).map((v, i) => i * 1e9);
    const state = JSON.parse(sessionStorage.getItem("userInput") || "null") || {
      mouse: null,
      touch: null,
    };

    const setBodyClasses = () => {
      document.body.classList.toggle("user-input--mouse", state.mouse);
      document.body.classList.toggle("user-input--touch", state.touch);
      document.body.classList.toggle("user-input--keyboard", state.keyboard);
    };

    const store = () => {
      sessionStorage.setItem("userInput", JSON.stringify(state));
      setUserInput({ ...state });
      setBodyClasses();
    };

    const onMouseMove = () => {
      mouseMoves.unshift(Date.now());
      mouseMoves.pop();
      const dist =
        mouseMoves
          .map((val, i, a) => Math.abs(val - a[i + 1]) || 0)
          .reduce((a, b) => a + b, 0) /
        (mouseMoves.length - 1);
      if (dist < 50) {
        document.removeEventListener("mousemove", onMouseMove, true);
        state.mouse = true;
        store();
      }
    };

    const onTouchStart = () => {
      document.removeEventListener("touchstart", onTouchStart, true);
      state.touch = true;
      store();
    };

    const onKeyUp = (e) => {
      if (!state.keyboard && navigationKeys.includes(e.key)) {
        state.keyboard = true;
        store();
      }
    };

    const onClick = () => {
      if (state.keyboard) {
        state.keyboard = false;
        store();
      }
    };

    if (!state.mouse) {
      document.addEventListener("mousemove", onMouseMove, true);
    }
    if (!state.touch) {
      document.addEventListener("touchstart", onTouchStart, true);
    }
    document.addEventListener("keyup", onKeyUp, true);
    document.addEventListener("click", onClick, true);

    setBodyClasses();

    return () => {
      document.removeEventListener("mousemove", onMouseMove, true);
      document.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("keyup", onKeyUp, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 space-y-4">
      <div className="p-4 bg-white shadow rounded-md w-80">
        <h1 className="text-lg font-bold mb-4">login</h1>
        <form>
          <label className="block mb-2">
            <span className="text-sm font-medium text-gray-700">username</span>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
            />
          </label>
          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">password</span>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
          >
            submit
          </button>
        </form>
        <a
          href="#"
          className="text-sm text-blue-500 underline mt-2 inline-block"
        >
          forgot password
        </a>
      </div>
      <div>
        <button
          className={`px-4 py-2 rounded-md ${
            userInput.mouse ? "bg-blue-100" : "bg-gray-200"
          }`}
        >
          using mouse
        </button>
        <button
          className={`px-4 py-2 rounded-md mx-2 ${
            userInput.touch ? "bg-blue-100" : "bg-gray-200"
          }`}
        >
          using touch
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            userInput.keyboard ? "bg-blue-100" : "bg-gray-200"
          }`}
        >
          using keyboard
        </button>
      </div>
    </div>
  );
};

export default WidgetComponent;
