export default function ContactPage() {
  return (
    <div className="max-w-md overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700">
        Have questions or feedback? Reach out to us at:
      </p>
      <ul className="list-disc list-inside mt-4">
        <li>Email: abdulkadircelebi.ac@gmail.com</li>

        <li>Address: Üsküdar, İstanbul, Türkiye</li>

        <li>Phone: +90 507 975 32 26</li>

        <li>
          <a
            href="https://www.linkedin.com/in/abdulkadircelebi/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-semibold"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
