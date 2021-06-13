import markdownStyles from "./markdown-styles.module.css";

export default function Article({ content }) {
  return (
    <div className="md:max-w-2xl md:mx-auto w-full">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}