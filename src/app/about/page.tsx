export default function AboutPage() {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold">ℹ️ アプリについて</h1>
        <p className="mt-4">
          このアプリは、読書記録を管理するためのアプリです。📚
        </p>
        <p className="mt-2">
          開発者: <strong>jumpei-jp</strong>
        </p>
        <p className="mt-2">
          ソースコード: <a href="https://github.com/jumpei-jp/book-track" className="text-blue-600 hover:underline">GitHub</a>
        </p>
      </div>
    );
  }