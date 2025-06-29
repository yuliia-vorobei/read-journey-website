const Icon = ({ id, width, height, className = "", fill }) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      aria-hidden="true"
      fill={fill}
    >
      <use href={`/icons.svg#${id}`}></use>
    </svg>
  );
};

export default Icon;
