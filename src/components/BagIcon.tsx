type BagIconProps = {
  className?: string;
};

export function BagIcon({ className }: BagIconProps) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6.5 9H17.5L18.2 20H5.8L6.5 9Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 9V7.5C9 5.843 10.343 4.5 12 4.5C13.657 4.5 15 5.843 15 7.5V9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
