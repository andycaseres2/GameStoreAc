export const SadIcon = ({ width, height, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-mood-sad"
    width={width ?? "24"}
    height={height ?? "24"}
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    className={className ?? ""}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
    <path d="M9 10l.01 0"></path>
    <path d="M15 10l.01 0"></path>
    <path d="M9.5 15.25a3.5 3.5 0 0 1 5 0"></path>
  </svg>
);
