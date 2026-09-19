import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 backdrop-blur-sm sm:p-6">
      <motion.div
        className="relative my-auto flex w-full max-w-2xl max-h-[min(85dvh,40rem)] flex-col overflow-hidden border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-sm top-3 right-3 bg-midnight hover:bg-gray-500"
          aria-label="Close project details"
        >
          <img src="assets/close.svg" className="w-6 h-6" />
        </button>
        <img src={image} alt={title} className="h-[min(12rem,28dvh)] w-full shrink-0 object-cover object-center bg-midnight sm:h-[min(16rem,32dvh)]" />
        <h5 className="shrink-0 px-4 pt-4 text-2xl font-bold text-white sm:px-5">{title}</h5>
        <div className="project-details-scroll min-h-0 max-h-60 overflow-y-scroll px-4 py-3 sm:max-h-64 sm:px-5">
          <p className="mb-2 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-2 font-normal text-neutral-400">
              {subDesc}
            </p>
          ))}
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <img
                key={tag.id}
                src={tag.path}
                alt={tag.name}
                className="rounded-lg size-8 sm:size-9"
              />
            ))}
          </div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
              aria-label={`View ${title} project`}
            >
              View Project
              <img src="assets/arrow-up.svg" className="size-4" alt="" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 font-medium text-neutral-500 cursor-not-allowed">
              Project Unavailable
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
