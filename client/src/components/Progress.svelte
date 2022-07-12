<script>
  export let count = 0;
</script>

<div id="cont">
  <b>{Math.floor(count * 100)}%</b>
  <svg
    id="svg"
    width="200"
    height="200"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      r="90"
      cx="100"
      cy="100"
      fill="transparent"
      stroke-dasharray="565.48"
      stroke-dashoffset="0"
    />
    <circle
      id="bar"
      r="90"
      cx="100"
      cy="100"
      fill="transparent"
      stroke-dasharray="565.48"
      stroke-dashoffset="0"
    />
  </svg>
</div>

<style>
  #svg circle {
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 1s linear;
    stroke: #666;
    stroke-width: 1em;
  }
  #svg #bar {
    stroke: #ff9f1e;
  }
  #cont {
    display: block;
    height: 200px;
    width: 200px;
    border-radius: 100%;
    position: relative;
  }

  #cont b {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2em;
  }
</style>
