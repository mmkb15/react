function PageHeading({icon="circle-fill", subtitle, title, desc="", children}:{icon?: string, subtitle: string, title: string, desc?: string, children?: any}) {
// function PageHeading({icon="circle-fill", subtitle, title, desc="", children}:any) {
  return (
    <>
      <div className="page-heading">
        <div className="page-heading-copy">
          <span className="page-icon">
            <i className={`bi bi-${icon}`} aria-hidden="true"></i>
          </span>
          <div>
            <p className="eyebrow mb-1">{subtitle}</p>
            <h1 className="h3 mb-1">{title}</h1>
            <p className="text-muted mb-0">
              {desc}
            </p>
          </div>
        </div>
        <div className="heading-actions">
          {children}
        </div>
      </div>
    </>
  );
}
export default PageHeading;
