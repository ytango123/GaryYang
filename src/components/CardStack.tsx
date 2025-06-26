import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// 为每张卡片定义最终位置和角度
const cards = [
  {
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80',
    position: { x: -280, y: -10, rotate: -16, scale: 0.95 }
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80',
    position: { x: -130, y: 0, rotate: -4, scale: 1 }
  },
  {
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    position: { x: 0, y: -40, rotate: 0, scale: 1.05 }
  },
  {
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80',
    position: { x: 160, y: -30, rotate: -2, scale: 1 }
  },
  {
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80',
    position: { x: 320, y: 0, rotate: 14, scale: 0.95 }
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

const CardStack: React.FC = () => {
  const [animation, setAnimation] = useState<'hidden' | 'stacked' | 'fanned'>('hidden');

  useEffect(() => {
    const stackTimer = setTimeout(() => setAnimation('stacked'), 200);
    const fanTimer = setTimeout(() => setAnimation('fanned'), 600);
    
    return () => {
      clearTimeout(stackTimer);
      clearTimeout(fanTimer);
    };
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