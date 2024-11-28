import React from "react";
import "./index.scss";

export default function Header({app}) {
      return (
            <div className="p-5 bg-blue-500 text-white text-3xl font-bold">
                  Fidget Spinner World | {app.name}
            </div>
      );
}