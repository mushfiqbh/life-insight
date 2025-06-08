import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import styles from "@/styles/PostContentStyles";

export default function PostContent({ data }: { data: string }) {
  return (
    <Card className="w-full p-3 md:p-12 bg-transparent">
      {data && (
        <motion.div
          className="post_content_parent" // Important for styling
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {parse(styles + data)}
        </motion.div>
      )}
    </Card>
  );
}
