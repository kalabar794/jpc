export default function StructuredDataInfo({ type }: { type: 'post' | 'project' }) {
  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg">
      <h4 className="text-sm font-semibold text-green-900 mb-2">
        ✅ Structured Data (Schema.org)
      </h4>
      <p className="text-sm text-green-800 mb-2">
        {type === 'post' 
          ? 'This content will automatically include Article schema markup for better search visibility.'
          : 'This project will automatically include CreativeWork schema markup.'}
      </p>
      <div className="text-xs text-green-700 space-y-1">
        <p>Automatically generated data includes:</p>
        <ul className="list-disc list-inside ml-2">
          <li>Author information</li>
          <li>Publication date</li>
          <li>Modified date</li>
          <li>Featured image</li>
          <li>Article/Project description</li>
          <li>Organization details</li>
        </ul>
      </div>
    </div>
  )
}