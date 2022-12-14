import Document, { Html, Head, Main, NextScript } from 'next/document';
import {ServerStyleSheets} from "@material-ui/styles";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        try{
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collect(<App {...props}/>)
            });

            const initialProps = await Document.getInitialProps(ctx);
            return { ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            }
        } finally {
            ctx.renderPage(sheet)
        }

    }
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" type="image/png" href="../public/favicon.ico"/>
                    <style>{`body { margin: 0 } /* custom! */`}</style>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <body className="custom_class">
                    <Main />
                    <NextScript />
                </body>
            </Html>
    )}
}

export default MyDocument;