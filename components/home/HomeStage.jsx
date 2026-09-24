"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import ReferenceMasks from "./ReferenceMasks";
import HomeForm from "./HomeForm";
import PortalTransition from "./PortalTransition";

const PORTAL_ORIGIN = "74% 45%";
const TRANSITION_MS = 950;
const IS_DEV = process.env.NODE_ENV === "development";

export default function HomeStage() {
  const [transitioning, setTransitioning] = useState(false);
  const [showReferenceOverlay, setShowReferenceOverlay] = useState(false);
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    if (!IS_DEV) return;

    function onKeyDown(event) {
      if (event.key.toLowerCase() !== "r") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      const isTyping =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (isTyping) return;
      setShowReferenceOverlay((value) => !value);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleResolved = useCallback(
    (id) => {
      if (reduceMotion) {
        router.push(`/for/${id}`);
        return;
      }
      setTransitioning(true);
      window.setTimeout(() => {
        router.push(`/for/${id}`);
      }, TRANSITION_MS);
    },
    [reduceMotion, router]
  );

  return (
    <div className="home-outer">
      <motion.div
        className="home-fade"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
      >
        <div className="stage-positioner">
          <motion.div
            className="home-stage"
            animate={{ scale: transitioning ? 1.32 : 1 }}
            transition={{ duration: 0.95, ease: [0.45, 0, 0.2, 1] }}
            style={{ transformOrigin: PORTAL_ORIGIN }}
          >
            <Image
              src="/images/home-background.png"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
              className="home-bg"
            />

            <ReferenceMasks />

            {IS_DEV && showReferenceOverlay && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/images/home-reference.png"
                alt=""
                aria-hidden="true"
                className="dev-reference-overlay"
              />
            )}

            <motion.div
              className="home-foreground"
              animate={{ opacity: transitioning ? 0.1 : 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="home-corner home-corner-tl">
                <p>
                  A
                  <br />
                  QUIETER
                  <br />
                  PLACE
                </p>
              </div>

              <div className="home-corner home-corner-tr">
                <p>
                  NOT EVERYONE
                  <br />
                  FINDS THIS
                </p>
                <span className="home-rule home-rule-tr" />
              </div>

              <div className="home-corner home-corner-bl">
                <span className="home-rule home-rule-bl" />
                <p>
                  KIND PEOPLE
                  <br />
                  MAKE A BRIGHTER WORLD
                </p>
              </div>

              <div className="home-corner home-corner-br">
                <p>
                  A
                  <br />
                  PERSONAL
                  <br />
                  ARCHIVE
                </p>
              </div>

              <div className="home-quote">
                <p>
                  Some doors only open
                  <br />
                  for the person they were <span className="home-script">made for.</span>
                </p>
              </div>

              <HomeForm onResolved={handleResolved} disabled={transitioning} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="home-mobile">
        <div className="home-mobile-bg">
          <Image
            src="/images/home-background.png"
            alt=""
            fill
            sizes="(max-width: 700px) 100vw, 1px"
            style={{ objectFit: "cover", objectPosition: "68% 50%" }}
            priority
          />
        </div>
        <div className="home-mobile-scrim" />

        <div className="home-mobile-corners">
          <p>
            A
            <br />
            QUIETER
            <br />
            PLACE
          </p>
          <p className="home-corner-tr-mobile">
            NOT EVERYONE
            <br />
            FINDS THIS
          </p>
        </div>

        <div className="home-quote-mobile">
          <p>
            Some doors only open
            <br />
            for the person they were <span className="home-script">made for.</span>
          </p>
        </div>

        <div className="home-mobile-bottom">
          <HomeForm
            onResolved={handleResolved}
            disabled={transitioning}
            variant="mobile"
            idSuffix="-mobile"
          />

          <div className="home-mobile-corners-bottom">
            <p>
              KIND PEOPLE
              <br />
              MAKE A BRIGHTER WORLD
            </p>
            <p className="home-corner-br-mobile">
              A
              <br />
              PERSONAL
              <br />
              ARCHIVE
            </p>
          </div>
        </div>
      </div>

      <PortalTransition active={transitioning} />
    </div>
  );
}
