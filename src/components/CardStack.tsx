import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// 为每张卡片定义最终位置和角度
const cards = [
  {
    image: 'https://cdn.jsdelivr.net/gh/ytango123/GaryYang.github.io@main/public/images/boat_small.jpg?w=400&q=75',
    position: { x: -290, y: -10, rotate: -16, scale: 0.95 }
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/ytango123/GaryYang.github.io@main/public/images/spring_small.jpg?w=400&q=75',
    position: { x: -130, y: 0, rotate: -4, scale: 1 }
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/ytango123/GaryYang.github.io@main/public/images/DT_small.jpg?w=400&q=75',
    position: { x: 0, y: -40, rotate: 0, scale: 1.05 }
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/ytango123/GaryYang.github.io@main/public/images/man_small.jpg?w=400&q=75',
    position: { x: 160, y: -30, rotate: -2, scale: 1 }
  },
  {
    image: 'https://cdn.jsdelivr.net/gh/ytango123/GaryYang.github.io@main/public/images/bright_small.jpg?w=400&q=75',
    position: { x: 330, y: 0, rotate: 14, scale: 0.95 }
  }
];

const cardVariants = {
  hidden: {
    y: 100,
    x: 0,
    opacity: 0,
    scale: 0.8,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 }
  },
  stacked: {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 }
  },
  fanned: (i: number) => ({
    ...cards[i].position,
    opacity: 1,
    transition: { 
      type: "spring" as const, 
      stiffness: 70,
      damping: 13,
      mass: 1,
      delay: i * 0.05
    }
  })
};

const preloadImages = async () => {
  const loadImage = (src: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  try {
    await Promise.all(cards.map(card => loadImage(card.image)));
    return true;
  } catch (error) {
    console.error('Error preloading images:', error);
    return false;
  }
};

const CardStack: React.FC = () => {
  const [animation, setAnimation] = useState<'hidden' | 'stacked' | 'fanned'>('hidden');

  useEffect(() => {
    const loadAndAnimate = async () => {
      await preloadImages();
      const stackTimer = setTimeout(() => setAnimation('stacked'), 300);
      const fanTimer = setTimeout(() => setAnimation('fanned'), 1000);
      
      return () => {
        clearTimeout(stackTimer);
        clearTimeout(fanTimer);
      };
    };

    loadAndAnimate();
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: '1500px',
      }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={card.image}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate={animation}
          style={{
            position: 'absolute',
            transformOrigin: 'center center',
          }}
        >
          <motion.img
            src={card.image}
            alt={`project-${i + 1}`}
            whileHover={{ 
              scale: 1.1,
              rotate: 0,
              transition: { type: "spring", stiffness: 300 }
            }}
            style={{
              width: 200,
              height: 300,
              objectFit: 'cover',
              borderRadius: 16,
              cursor: 'pointer',
              userSelect: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CardStack; 