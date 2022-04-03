import Morgan from "morgan";
import Task from "../../../model/Task";
import { dbConnect, runMiddleware } from "../../../utils/index";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  const morgan = Morgan("dev");

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ msg: "Task does not exist." });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(task);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "DELETE":
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        console.log("inside delete route.");
        if (!deletedTask)
          return res.status(404).json({ msg: "Task does not exist." });
        await runMiddleware(req, res, morgan);
        return res
          .status(200)
          .json({ msg: "Task has been deleted successfully." });
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
      try {
        const task = await Task.findById(id);
        if (!task) {
          return res.status(404).json({ msg: "Task does not exist." });
        } else {
          const updatedTask = await Task.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
          });
          if (!updatedTask) {
            return res.status(204).json({ msg: "Task does not updated." });
          } else {
            return res.status(200).json({
              task: updatedTask,
              msg: "Task has been updated successfully.",
            });
          }
        }
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    default:
      return res.status(400).json({ msg: "This method is not supported." });
  }
};
