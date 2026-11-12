import { BeatLoader } from "react-spinners";

function LoadingSpinner({ text = "LOADING..." }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
      <BeatLoader
        color="#B49A6C"
        size={12}
        margin={5}
        speedMultiplier={0.8}
      />

      <p className="text-xs tracking-[0.3em] text-[#A8A8A3]">
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;