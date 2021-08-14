import styles from './Loading.module.css';

export const Loading = () => {
  return(
    <div className={styles.container}>
      <svg className={styles.loading} width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50.2734 0H39.7266V21.0938H50.2734V0Z" fill="#ABECEC"/>
        <path d="M24.3674 31.8249L31.825 24.3673L16.9097 9.45204L9.45211 16.9096L24.3674 31.8249Z" fill="#ABECEC"/>
        <path d="M21.0938 39.7266H0V50.2734H21.0938V39.7266Z" fill="#42C8C6"/>
        <path d="M16.9094 80.5473L31.8247 65.632L24.3671 58.1745L9.45187 73.0897L16.9094 80.5473Z" fill="#42C8C6"/>
        <path d="M50.2734 68.9062H39.7266V90H50.2734V68.9062Z" fill="#02ACAB"/>
        <path d="M73.0893 80.5478L80.5469 73.0902L65.6316 58.175L58.174 65.6325L73.0893 80.5478Z" fill="#02ACAB"/>
        <path d="M90 39.7266H68.9062V50.2734H90V39.7266Z" fill="#027372"/>
      </svg>
    </div>
  )
};