'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from "./signin.module.css";

export default function SigninPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const width = window.screen.width;
        const height = window.screen.height;

        fetch("/api/logScreenResolution", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ width, height }),
        });
      }, []);

    return(
        <div className={styles.container}>
            <img src="/Line 5.svg" className={styles.line5} />
            <img src="/Line 10.svg" className={styles.line10} />
            <img src="/Line 9.svg" className={styles.line9} />
            <div className={styles.card}>
                <div>
                    <div className={styles.logo}>
                        <img src="/Group 1.svg" />
                    </div>
                    <div className={styles.login}>
                        <img src="/Line 4.svg" />
                        <h2 className={styles.title}>Вхід</h2>
                        <img src="/Line 3.svg" />
                    </div>
                    <form>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputContainer}>
                                <img src="/email.svg" className={styles.Icon} />
                                <input
                                    type="email"
                                    placeholder="E-mail"
                                    className={styles.customInput}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputContainer}>
                                <img src="/password.svg" className={styles.Icon} />
                                <input
                                    type="password"
                                    placeholder="Пароль"
                                    className={styles.customInput}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={styles.rememberMe}>
                                <label className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <span className={styles.checkmark}></span>
                                    Запам’ятати мене
                                </label>
                                <Link href="/reset-password" className={styles.forgotPassword}>
                                    Забули пароль?
                                </Link>
                            </div>
                        </div>
                        <button type="submit" className={styles.button}>
                            Далі
                        </button>
                    </form>
                    <img src="/Line 3_2.svg" />
                </div>
                <div className={styles.register}>
                    Немає аккаунту? <Link href="/signup" className={styles.link}>Реєстрація</Link>
                </div>
                <p className={styles.socialText}>Вхід за допомогою</p>
                <div className={styles.socialIcons}>
                    <button className={styles.icon} onClick={() => router.push('/')}>
                        <img className={styles.iconImage} src="/discord.svg" />
                    </button>
                    <button className={styles.icon} onClick={() => router.push('/')}>
                        <img className={styles.iconImage} src="/google.svg" />
                    </button>
                    <button className={styles.icon} onClick={() => router.push('/')}>
                        <img className={styles.iconImage} src="/telegram.svg" />
                    </button>
                </div>
            </div>
            <img src="/Line 6.svg" className={styles.line6} />
            <img src="/Line 8.svg" className={styles.line8} />
            <img src="/Line 7.svg" className={styles.line7} />
        </div>
    );
}
