import react, { PureComponent } from 'react';
import styles from './Fireworks.less';
import { CloseCircleOutlined } from '@ant-design/icons';
import Rocket from '@/utils/fireworks';

let context = null,
  canvas = null,
  shards = [],
  counter = 0,
  rockets = [],
  targets = [];

class Fireworks extends PureComponent {
  componentDidMount() {
    canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.fillStyle = '#000';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0, max = imgData.data.length; i < max; i += 4) {
      const alpha = imgData.data[i + 3];
      const x = Math.floor(i / 4) % imgData.width;
      const y = Math.floor(i / 4 / imgData.width);

      if (alpha && x % 3 === 0 && y % 3 === 0) {
        targets.push({ x, y });
      }
    }
    console.log(context);
    window.addEventListener('resize', this.resizeCanvas, false);
    this.startFire();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCanvas, false);
  }

  resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  clearCanvas() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  startFire = () => {
    // let textcanvas = document.getElementById('textCanvas');
    // let ctx = textcanvas.getContext('2d');
    // let bgcanvas = document.getElementById('bgCanvas');
    // let ctx2 = bgcanvas.getContext('2d');
    context.fillStyle = '#000';
    let fontSize = 200;
    const text = '张刘琴我爱你';
    let textWidth = 99999999;
    while (textWidth > window.innerWidth) {
      context.font = `900 ${fontSize--}px Arial`;
      textWidth = context.measureText(text).width;
    }
    // textcanvas.width = textWidth;
    // textcanvas.height = fontSize * 1.5;
    context.font = `900 ${fontSize}px Arial`;
    context.fillText(text, 0, fontSize);
    this.fireAnimation();
  };

  fireAnimation = () => {
    context.fillStyle = 'rgba(0, 0, 0, .1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    counter += 1;

    if (counter % 10 === 0) {
      rockets.push(new Rocket(canvas));
    }
    rockets.forEach((r, i) => {
      r.draw(context);
      r.update();
      if (r.ySpeed > 0) {
        shards = r.explode(targets, shards);
        rockets.splice(i, 1);
      }
    });

    shards.forEach((s, i) => {
      s.draw(context);
      shards = s.update(canvas, shards);

      if (s.timer >= s.ttl || s.lightness >= 99) {
        // ctx3.fillRect(s.target.x, s.target.y, 3 + 1, 3 + 1);
        shards.splice(i, 1);
      }
    });
    window.requestAnimationFrame(this.fireAnimation);
  };

  render() {
    return (
      <div className={styles.fireworks}>
        <span
          onClick={() => this.props.stopPlay()}
          className={styles.closeFireworksPanel}
        >
          <CloseCircleOutlined style={{ fontSize: 20, color: '#888' }} />
        </span>
        {/* <canvas id="textCanvas"></canvas> */}
        <canvas id="myCanvas">
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        {/* <canvas id="bgCanvas"></canvas> */}
      </div>
    );
  }
}

export default Fireworks;
