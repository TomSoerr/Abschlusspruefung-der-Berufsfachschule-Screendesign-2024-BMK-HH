import Helper from './helper.js';

// clip-path: url(#oval);

const oval = () => {
  const tmp = Helper.create('template'); tmp.innerHTML = `
    <svg width="0" height="0">
      <defs> 
        <clipPath
          id="oval"
          transform="scale(0.004444,0.0041666666)"
          clipPathUnits="objectBoundingBox"
          >
            <path class="cls-1" d="M231.89,120.7c5.39,42.27-14.61,84.27-54.61,100.27-51,20-120,14-154.93-31.76-3.51-4.79-6.67-9.87-9.42-15.18-6.2-11.96-10.37-25.13-12.07-39.07-.57-4.65-.82-9.4-.69-14.28C3.28,77.97,30.28,42.97,66.28,17.97,113.28-14.03,173.28-2.03,202.83,43.99c3.39,4.04,6.65,8.29,9.61,12.75,8.89,13.39,15.08,28.73,17.77,45.25,1,6.12,1.53,12.39,1.67,18.71Z"/>
        </clipPath>
      </defs>
    </svg>
    `;
  return tmp.content;
};

export { oval };
