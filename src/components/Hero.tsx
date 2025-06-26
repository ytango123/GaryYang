import { motion } from 'framer-motion';
import CardStack from './CardStack';

const textSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 14,
};

const Hero: React.FC = () => (
  <section
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      minHeight: '100vh',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '3rem 1rem',
      textAlign: 'center',
      width: '100%',
      gap: '3rem',
    }}
  >
    {/* 顶部位置和邮箱 */}
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...textSpring, delay: 0.1 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
        fontFamily: "'Futura Now Headline', sans-serif",
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      }}
    >
      <div style={{
        color: '#363636',
        fontWeight: 500,
      }}>
        SHENZHEN, GUANGDONG
      </div>
      <div style={{ 
        color: '#C0C0C0',
        fontWeight: 300,
      }}>
        123090721@link.cuhk.edu.cn
      </div>
    </motion.div>

    {/* 主要名字 */}
    <motion.h1
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...textSpring, delay: 0.2 }}
      style={{
        fontSize: 'clamp(3rem, 12vw, 8rem)',
        fontWeight: 700,
        margin: 0,
        letterSpacing: '-0.05em',
        fontFamily: "'Futura Now Headline', sans-serif",
        textTransform: 'uppercase',
        lineHeight: '0.9',
        transform: 'scaleX(0.95)',
        marginTop: '0rem',
        color: '#363636',
      }}
    >
      GEYI&nbsp;YANG
    </motion.h1>

    {/* 中部卡片栈 */}
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center', 
      width: '100%',
      marginTop: '2rem',
      minHeight: '400px',
    }}>
      <CardStack />
    </div>

    {/* 底部职业身份 */}
    <motion.h2
      initial={{ opacity: 0, y: -40, scale: 0.9 }}
      animate={{ opacity: 1, y: -30, scale: 1 }}
      transition={{ ...textSpring, delay: 0.4 }}
      style={{
        fontSize: 'clamp(2rem, 8vw, 5rem)',
        fontWeight: 600,
        margin: 0,
        color: '#D1D1D1',
        fontFamily: "'Futura Now Headline', sans-serif",
        letterSpacing: '-0.03em',
        lineHeight: '1',
        transform: 'scaleX(0.9)',
        marginTop: '1rem',
      }}
    >
      DEVELOPER & PHOTOGRAPHER
    </motion.h2>
  </section>
);

export default Hero;