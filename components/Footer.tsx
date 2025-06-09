import { Footer2Props } from "@/interfaces";
import { useTranslations } from "next-intl";

const FooterFixed = ({
  logo = {
    src: "https://shadcnblocks.com/images/block/block-1.svg",
    alt: "footer.logo.alt",
    title: "footer.logo.title",
    url: "#",
  },
  tagline = "footer.tagline",
  menuItems = [
    {
      title: "footer.product.title",
      links: [
        { text: "footer.product.overview", url: "#" },
        { text: "footer.product.pricing", url: "#" },
      ],
    },
    {
      title: "footer.company.title",
      links: [
        { text: "footer.company.about", url: "#" },
        { text: "footer.company.team", url: "#" },
      ],
    },
    {
      title: "footer.resources.title",
      links: [
        { text: "footer.resources.help", url: "#" },
        { text: "footer.resources.sales", url: "#" },
      ],
    },
    {
      title: "footer.social.title",
      links: [
        { text: "footer.social.twitter", url: "#" },
      ],
    },
  ],
}: Footer2Props) => {
  const t = useTranslations();

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        <div className="col-span-2 mb-8 lg:mb-0">
          <div className="flex items-center gap-2 lg:justify-start">
            <a href={logo.url}>
              <img
                src={logo.src}
                alt={t(logo.alt)}
                title={t(logo.title)}
                className="h-10"
              />
            </a>
            <p className="text-xl font-semibold">{t(logo.title)}</p>
          </div>
          <p className="mt-4 font-bold">{t(tagline)}</p>
        </div>
        {menuItems.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h3 className="mb-4 font-bold">{t(section.title)}</h3>
            <ul className="space-y-4 text-muted-foreground">
              {section.links.map((link, linkIdx) => (
                <li
                  key={linkIdx}
                  className="font-medium hover:text-primary"
                >
                  <a href={link.url}>{t(link.text)}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FooterFixed };