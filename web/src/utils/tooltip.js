export default function Tooltip({ style, shade, setParameter }) {
    return (
        <div className = "group relative">
            <div className = "w-12 h-12" onClick = { () => setParameter(style) } style = {{ backgroundColor: shade }}></div>
            <div className = "absolute top-3 left-[120%] hidden group-hover:block w-auto">
                <div className = "bottom-full right-0 rounded bg-black text-xs text-white px-4 py-1">{ style.charAt(0).toUpperCase() + style.slice(1) }</div>
            </div>
        </div>
    )
}