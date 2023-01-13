export const useScrollIntoView = () => {
  const scrollIntoView = (id: string, behavior?: ScrollBehavior) => {
    const el = document.getElementById(id);

    el?.scrollIntoView({
      behavior: behavior || "smooth",
      block: "start",
      inline: "center",
    });
  };

  return [scrollIntoView];
};
