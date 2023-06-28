import avatar from '/avatar.png';
import styles from './Nav.module.css';
import { useState } from 'react';
import { useMediaQuery } from '../utils/useMediaQuery';
import { motion } from 'framer-motion';

const navMotion = {
	visible: {
		opacity: 1,

		transition: {
			when: 'beforeChildren',
			staggerChildren: 0.15,
		},
	},
	hidden: {
		opacity: 0,
	},
};
const itemMotion = {
	visible: { opacity: 1, x: 0 },
	hidden: { opacity: 0, x: -100 },
};
const itemMotionDesktop = {
	visible: { opacity: 1, x: 0 },
	hidden: { opacity: 1, x: 0 },
};

export default function Nav() {
	const [toggled, setToggled] = useState(false);
	const matches = useMediaQuery('(min-width: 768px)');
	return (
		<nav className={styles.nav}>
			<div className={styles.line}></div>
			<div className={styles.avatarcontainer}>
				<img src={avatar} alt='avatar image' />
			</div>
			<h1 className={styles.title}>
				<a href='/'>Hua.</a>
			</h1>
			{matches && (
				<div className={styles.menu}>
					<a href='/'>Home</a>
					<a href='/about'>about</a>
					<a href='/services'>services</a>
					<a href='/contact'>contact</a>
				</div>
			)}
			{!matches && (
				<div
					onClick={() => setToggled((prev) => !prev)}
					className={styles.hamburguer}
				>
					<motion.span
						animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
					></motion.span>
					<motion.span
						animate={{ rotateZ: toggled ? -45 : 0, y: toggled ? 0 : 0 }}
					></motion.span>
					<motion.span
						animate={{
							rotateZ: toggled ? 45 : 0,
							y: toggled ? -8 : 0,
							x: toggled ? -4 : 0,
							opacity: toggled ? 0 : 1,
						}}
					></motion.span>
				</div>
			)}

			{toggled && !matches && (
				<motion.div
					variants={navMotion}
					animate='visible'
					initial='hidden'
					className={styles.mobilemenu}
				>
					<motion.a variants={itemMotion} href='/'>
						Home
					</motion.a>
					<motion.a variants={itemMotion} href='/about'>
						about
					</motion.a>
					<motion.a variants={itemMotion} href='/services'>
						services
					</motion.a>
					<motion.a variants={itemMotion} href='/contact'>
						contact
					</motion.a>
				</motion.div>
			)}
		</nav>
	);
}
