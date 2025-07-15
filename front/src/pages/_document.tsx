import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <title>포트폴리오 APOL</title>
        <link rel="icon" href="/apol-favicon.png" type="image/png" />

        <meta
          name="description"
          content="순수한 소개와 기록의 의미를 담은 포트폴리오 사이트"
        />
        <meta name="author" content="APOL" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
