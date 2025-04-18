import { motion } from 'framer-motion'
import IconCheckuree from '@/assets/icons/loading/ico-checkuree.svg'
import IconCheckureeNote1 from '@/assets/icons/loading/ico-checkuree-note-1.svg'
import IconCheckureeNote2 from '@/assets/icons/loading/ico-checkuree-note-2.svg'
export default function Loading() {
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative w-[80px]">
        {/* ico-checkuree */}
        <motion.img
          src={IconCheckuree}
          width={48}
          height={48}
          alt="Loading Checkuree"
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'loop',
            delay: 0, // 즉시 시작
            repeatDelay: 1.5, // 전체 사이클 동안의 지연 시간
          }}
          className="mb-4"
          loading="lazy"
        />
        {/* ico-checkuree-note-1 */}
        <motion.img
          src={IconCheckureeNote1}
          width={15}
          height={15}
          alt="Loading Note 1"
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'loop',
            delay: 0.5, // 0.5초 후 시작
            repeatDelay: 1.5,
          }}
          className="absolute top-[13px] right-5"
          loading="lazy"
        />
        {/* ico-checkuree-note-2 */}
        <motion.img
          src={IconCheckureeNote2}
          width={15}
          height={15}
          alt="Loading Note 2"
          variants={iconVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'loop',
            delay: 1, // 1초 후 시작
            repeatDelay: 1.5,
          }}
          className="absolute top-[13px] right-0"
          loading="lazy"
        />
      </div>
    </div>
  )
}
