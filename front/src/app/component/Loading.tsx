import React from 'react';

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  return (
    <div>
      <span id="ProgressLabel" className="sr-only">Loading</span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow={progress}
        className="block rounded-full bg-gray-200"
      >
        <span className="block h-4 rounded-full bg-indigo-600 text-center text-xs" style={{ width: `${progress}%` }}>
          <span className="font-bold text-white">{progress}%</span>
        </span>
      </span>
    </div>
  );
};

export default Loading;
